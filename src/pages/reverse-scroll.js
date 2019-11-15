import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Layout from "../components/layout";
import Loader from "../components/loader";
import { fetchUsers } from "../utils";

const Item = ({ user }) => (
  <div className="border border-gray-200 px-6 py-4 flex items-center">
    <div>
      <img
        className="w-12 h-12 rounded-full"
        src={user.photo}
        alt={user.name}
      />
    </div>
    <div className="pl-4 text-gray-600 font-medium">{user.name}</div>
  </div>
);

const ItemList = ({ users }) =>
  users.map(user => <Item key={user.id} user={user} />);

const ReverseScroll = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [hasMore, setHasMore] = useState(true);
  const itemListParentRef = useRef(null);

  useEffect(() => {
    // Reverse Scroll: scroll to the bottom of the list
    itemListParentRef.current.scrollTop =
      itemListParentRef.current.scrollHeight;
  }, []);

  const loadMoreUsers = () => {
    // TODO: Stop fetching users on initial page load
    if (users.length >= 80) {
      return setHasMore(false);
    }
    fetchUsers().then(users => setUsers(prevUsers => [...prevUsers, ...users]));
  };

  return (
    <Layout>
      <div className="container mx-auto flex flex-col max-w-md items-center border">
        <div className="py-4 max-w-md  text-semibold text-xl">
          Users List with Reverse Inifinte Scroll
        </div>
        <div
          className="container max-w-md mt-4 overflow-y-auto"
          style={{ height: "22rem" }}
          ref={itemListParentRef}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreUsers}
            hasMore={hasMore}
            loader={
              <div className="loader py-8 mx-auto flex justify-center" key={0}>
                <Loader />
              </div>
            }
            isReverse
            useWindow={false}
          >
            <ItemList users={users} />
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

ReverseScroll.getInitialProps = async function() {
  const users = await fetchUsers();
  return { users };
};

export default ReverseScroll;
