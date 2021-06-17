//Filter to only get array back with user
//becouse
const getRecipentEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];

export default getRecipentEmail;
