//Filter to only get array back with user
const getRecipentEmail = (users, userLoggedIn) => { 
    users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]
}