import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ViewProfile from "../components/viewProfile/ViewProfile";
import ViewProfileAdmin from "../components/viewProfile/ViewProfileAdmin";

function ViewProfiles() {
  const { state } = useLocation();

  const mygender = localStorage.getItem("dtrusergender");
  const [searchedUser, setsearchedUser] = useState(state.data);
  useEffect(() => {
    if (state.admin === false) {
      const users = state.data.filter((e) => e.gender && e.gender !== mygender);
      setsearchedUser(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mygender]);
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      {state.admin === false ? (
        searchedUser?.length > 0 ? (
          searchedUser.map((user) => <ViewProfile user={user} />)
        ) : (
          <h3 style={{ margin: "1rem", width: "100%", textAlign: "center" }}>
            No User Found
          </h3>
        )
      ) : searchedUser?.length > 0 ? (
        searchedUser.map((user) => <ViewProfileAdmin user={user} />)
      ) : (
        <h3 style={{ margin: "1rem", width: "100%", textAlign: "center" }}>
          No User Found
        </h3>
      )}
    </div>
  );
}

export default ViewProfiles;
