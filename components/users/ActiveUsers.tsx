import { useOthers, useSelf } from "@/liveblocks.config";
import { Avatar } from "./Avatar";
import { generateRandomName } from "@/lib/utils";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className="flex h-screen w-full select-none place-content-center place-items-center">
      <div className="flex pl-3">
        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] bordr-primary-green" />
        )}
        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar
              key={connectionId}
              name={generateRandomName()}
              otherStyles="-ml-3"
            />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] bordr-primary-green" />
        )}
      </div>
    </main>
  );
};

export default ActiveUsers;
