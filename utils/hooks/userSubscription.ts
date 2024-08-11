"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

let FREE_LIMI_FILE_COUNT: any;

const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

const userSubscription = () => {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverFileLimit, setOverFileLimit] = useState(
    FREE_LIMI_FILE_COUNT >= 2 ? true : false,
  );
  const { user } = useUser();

  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [filesSnapshot, filesLoading] = useCollection(
    user && collection(db, "users", user?.id, "files"),
  );

  useEffect(() => {
    if (!snapshot) return;

    const data: any = snapshot.data();
    if (!data) {
      setHasActiveMembership(data?.activeMembership);
    }
  }, [snapshot]);

  useEffect(() => {
    if (!filesSnapshot) return;

    const files = filesSnapshot.docs;
    FREE_LIMI_FILE_COUNT = files?.length;
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    setOverFileLimit(files.length >= usersLimit);
  }, [filesSnapshot, hasActiveMembership, PRO_LIMIT, FREE_LIMIT]);

  return { hasActiveMembership, loading, error, isOverFileLimit, filesLoading };
};

export default userSubscription;
