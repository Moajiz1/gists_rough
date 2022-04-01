import { message, notification } from "antd";
import { userConstants } from "../../constants/constants";

export const localToken = localStorage.getItem("accessToken");

export const getUserToken = (code) => {
  const { clientID, clientSecret } = userConstants;
  const requestBody = {
    headers: {
      accept: "application/vnd.github.v3+json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `code=${code}&client_id=${clientID}&client_secret=${clientSecret}`,
  };
  return fetch(
    "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
    {
      method: "post",
      ...requestBody,
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.access_token;
    });
};

const getNotificationStyle = (type) => {
  return {
    error: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #ffa39e",
      backgroundColor: "#fff1f0",
    },
    success: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #b7eb8f",
      backgroundColor: "#f6ffed",
    },
  }[type];
};

export const openNotification = (status) => {
  const args = {
    message: "Gist Updated",
    description: "Gist is updated succesfully, vist your profile to preview.",
    duration: 0,
    style: getNotificationStyle("success"),
  };
  const argsTwo = {
    message: "Gist Not Updated!",
    description: "Pls enter some data to update existing Gist",
    duration: 0,
    className: "notification-type-infoo",
    style: getNotificationStyle("error"),
  };
  if (status === 200) {
    notification.open(args);
  } else if (status === 0) {
    notification.open(argsTwo);
  }
};

export const addGistNotification = (status) => {
  const args = {
    message: "Gist Created",
    description: "Gist is Created succesfully, vist your profile to preview.",
    duration: 0,
    style: getNotificationStyle("success"),
  };
  const argsTwo = {
    message: "Gist Not Created!",
    description:
      "Gist is Not created due to some isusses, pls check the fields are updated properly?!.",
    duration: 0,
    style: getNotificationStyle("error"),
  };
  if (status === 200) {
    notification.open(args);
  } else if (status === 0) {
    notification.open(argsTwo);
  }
};

export const successCheck = (response) => {
  if (response === 200) {
    message.success("Gist Updated Successfully");
  } else if (response === undefined) {
    message.error("Fail to Update Gist, pls check all fields are filled");
  }
};

export const successCheckAdd = (response) => {
  if (response === 201) {
    message.success("Gist Added Successfully");
  } else {
    message.error("Fail to Add Gist, pls check all fields are filled");
  }
};

export const successCheckFork = (response) => {
  if (response === 201) {
    message.success("Gist Fork Successfully");
  } else {
    message.error(
      "Fail to Fork Gist, Either gist is already forked or this is your personal Gist!"
    );
  }
};

// const gistForkss = new Octokit({ auth: `${localToken}` });

// export const gistDelete = async (id) => {
//   const data = await gistForkss
//     .request(`DELETE /gists/${id}`, {
//       gist_id: "id",
//     })
//     .then((res) => res);
//   console.log(data);
//   return data;
// };

// export const forkAGist = async (id) => {
//   const data = await gistForkss
//     .request(`POST /gists/${id}/forks`)
//     .then((res) => res);
//   console.log(data);
//   return data;
// };

// export const starAGist = async (id) => {
//   const data = await gistForkss
//     .request(`PUT /gists/${id}/star`)
//     .then((res) => res);
//   console.log(data);
//   return data;
// };

// export const UnStarAGist = async (id) => {
//   const data = await gistForkss
//     .request(`DELETE /gists/${id}/star`)
//     .then((res) => res);
//   console.log(data);
//   return data;
// };

//auth fns
export function toParams(query) {
  const q = query.replace(/^\??\//, "");

  return q.split("&").reduce((values, param) => {
    const [key, value] = param.split("=");

    values[key] = value;

    return values;
  }, {});
}

export function toQuery(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}
