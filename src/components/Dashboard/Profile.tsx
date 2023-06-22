import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputDescription from "../Various/InputDescription";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Profile() {
  const [user] = useAuthState(firebaseAuth);
  console.log(user);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          My profile
          <Avatar>
            <AvatarImage src={user?.photoURL as string} />
            <AvatarFallback>
              {user?.displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 mb-6">
          <Label>
            Name
            <Input
              value={user?.displayName as string}
              disabled
              className="mt-2"
            />
          </Label>
          <Label>
            Email
            <Input value={user?.email as string} disabled className="mt-2" />
          </Label>

          <InputDescription>
            Your account data is fetched from your connected account that you
            used to log in.
          </InputDescription>
        </div>

        <Link href="/auth/logout">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default Profile;
