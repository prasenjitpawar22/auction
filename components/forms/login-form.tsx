"use client";

import { GoogleSignIn } from "@/components/google-sign-in";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { RoleType } from "@/app/types";

export default function LoginForm() {
  const [role, setRole] = useState<RoleType>("bidder");

  return (
    <>
      <RadioGroup
        defaultValue="bidder"
        className="flex w-full items-center justify-center gap-2"
        onValueChange={(e: RoleType) => setRole(e)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={"bidder"} id="r1" />
          <Label htmlFor="r1">Bidder</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={"creator"} id="r3" />
          <Label htmlFor="r3">Creator</Label>
        </div>
      </RadioGroup>
      <GoogleSignIn role={role} />
    </>
  );
}
