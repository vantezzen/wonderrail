import DontIndex from "@/components/Various/Seo/DontIndex";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function Impressum() {
  return (
    <Card>
      <DontIndex />

      <h1>Impressum</h1>

      <div className="impressum">
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          Bennett Hollstein <br />
          Glasbläserallee 25
          <br />
          10245 Berlin <br />
        </p>
        <p>
          <strong>Kontakt:</strong> <br />
          E-Mail: <a href="mailto:hello@wonderrail.com">hello@wonderrail.com</a>
          <br />
        </p>
        <p>
          <strong>Haftungsausschluss: </strong>
          <br />
          <br />
          <strong>Haftung für Inhalte</strong>
          <br />
          <br />
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
          <br />
          <br />
          <strong>Haftung für Links</strong>
          <br />
          <br />
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
          <br />
          <br />
          <strong>Urheberrecht</strong>
          <br />
          <br />
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
          <br />
          <br />
          <strong>Datenschutz</strong>
          <br />
          Die Datenschutzerklärung kann auf
          <Link href="/legal/privacy">
            https://wonderrail.com/legal/privacy
          </Link>
          eingesehen werden.
        </p>
        <br />
        Website Impressum erstellt durch{" "}
        <a href="https://www.impressum-generator.de">
          impressum-generator.de
        </a>{" "}
        von der{" "}
        <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">
          Kanzlei Hasselbach
        </a>
      </div>
    </Card>
  );
}

export default Impressum;
