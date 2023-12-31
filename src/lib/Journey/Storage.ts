import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "../firebase/clientApp";
import { Journey, JourneySchema } from "../types";
import { saveAs } from "file-saver";

export default class Storage {
  async saveJourney(journey: Journey) {
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new Error("No user signed in");
    }

    if (localStorage.getItem("journey")) {
      localStorage.removeItem("journey");
    }

    const journeyDocRef = doc(
      firestore,
      `/users/${user.uid}/journeys/${journey.id}`
    );
    await setDoc(journeyDocRef, {
      journey: JSON.stringify(journey),
      isPublic: journey.isPublic, // Needs to be saved separately so Firebase rules can check it easily
    });

    return {
      userId: user.uid,
      journeyId: journey.id,
    };
  }

  async loadJourney(userId: string, journeyId: string) {
    const journeyDocRef = doc(
      firestore,
      `/users/${userId}/journeys/${journeyId}`
    );
    const journeyDoc = await getDoc(journeyDocRef);
    if (!journeyDoc.exists()) {
      throw new Error("Journey not found");
    }

    const journey = JourneySchema.parse(
      JSON.parse(journeyDoc.data()?.journey)
    ) as Journey;
    return journey;
  }

  async saveTemporaryJourney(journey: Journey) {
    const journeyJson = JSON.stringify(journey);
    localStorage.setItem("journey", journeyJson);
  }

  loadTemporaryJourney() {
    const journeyJson = localStorage.getItem("journey");
    if (!journeyJson) {
      throw new Error("No temporary journey found");
    }

    const journey = JourneySchema.parse(JSON.parse(journeyJson)) as Journey;
    return journey;
  }

  downloadAsJson(journey: Journey) {
    const journeyJson = JSON.stringify(journey);
    const blob = new Blob([journeyJson], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, `${journey.name}.json`);
  }

  loadFromJson(json: string) {
    const journey = JourneySchema.parse(JSON.parse(json)) as Journey;
    return journey;
  }
}
