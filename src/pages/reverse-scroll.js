import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
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

Item.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    username: PropTypes.string
  })
};

const ItemList = ({ users }) =>
  users.map(user => <Item key={user.id} user={user} />);

ItemList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string,
      username: PropTypes.string
    })
  )
};

const ReverseScroll = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  // initially hasMore is set to false to prevent loading more users
  // on initial render
  const [hasMore, setHasMore] = useState(false);
  const itemListParentRef = useRef(null);

  useEffect(() => {
    // set hasMore to true after intial render so that on
    // scrolling up load more users is fired up
    setHasMore(true);
    // Reverse Scroll: scroll to the bottom of the list
    itemListParentRef.current.scrollTop =
      itemListParentRef.current.scrollHeight;
  }, []);

  const loadMoreUsers = () => {
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
