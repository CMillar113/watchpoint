/**
 * Page that will link auth0 database and mysql - due to privlidges this iwll work for demoing
 * reality would prefer access between auth and mysql without a middleman
 */
import { useUser } from "@auth0/nextjs-auth0";
import router from "next/router";
import { useEffect, useState } from "react";
import FullScreenSpinner from "../src/components/FullScreenSpinner";

export default function accountChecking() {
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    async function checkDB() {
      setLoading(true);

      const auth0PrimaryKey = user.sub; //auth0 unique identifier
      const exists = await checkUserExists(auth0PrimaryKey);

      if (!exists) {
        await createUser(user);
      }

      router.push("/athlete");

      setLoading(false);
    }

    checkDB();
  }, [user]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return null;
}

/**
 * {Takes email from auth0 sign in - checks exists in sql - or creates the sql information }
 * @param  auth0PrimaryKEy - unique_identifier
 * @returns sql unique_identifier of logged in athlete
 */
async function checkUserExists(auth0PrimaryKey) {
  try {
    const response = await fetch(`/api/userDetails?auth0=${auth0PrimaryKey}`);
    const result = await response.json();

    let userExists = false;
    if (result !== undefined && result.length >= 1) {
      result.forEach((user) => {
        if (user.unique_identifier === auth0PrimaryKey) {
          userExists = true;
        }
      });
    }
    return userExists;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function createUser(user) {
  console.log("create", { user });
  try {
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.sub,
        username: user.nickname,
        email: user.email,
      }),
    });
    const result = await response.json();

    console.log({ result });
  } catch (e) {
    console.error(e);
  }
}
