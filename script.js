/** NOTE
* putting your auth and key here is not best practice for security 
* but as far as im aware this is the only way to use a script like this in zapier
* without building a custom solution though the developer platform.
* Please ensure you understand the security implications of this and do not expose your auth and key publicly.
*/
const AUTH = 'Bearer <your auth here>'
const KEY = '<your key here>'

// eslint-disable-next-line no-unused-vars
const output = {} // Initialize output

// // you can uncomment this code and put in any test data if you wish to test in a local environment 
// const inputData = {
//   contactEmail: 'testemail@email.com',
//   contactFirstName: 'John',
//   contactLastName: 'Smith'
// }

// declare variables for contact information here for easier access in global scope
let contactEmail 
let contactFirstName
let contactLastName

// Trim contact information from inputData
// Check if required input data is provided
try {
  contactEmail = inputData.contactEmail.trim().toLowerCase()
  contactFirstName = inputData.contactFirstName.trim().toLowerCase()
  contactLastName = inputData.contactLastName.trim().toLowerCase()
  console.log("looking for \n")
  console.log(contactEmail)
  console.log(contactFirstName)
  console.log(contactLastName)
} catch (error) {
  if (error instanceof TypeError) {
    return 'Error: Missing required input data for contact information. Please provide contact email, first name, and last name.', error
  } else {
    return 'Error: ', error
  }
}


/**
 * Fetches all contacts from Karbon API with provided contact email.
 * @returns {Promise<Object>} 
 *  promise that resolves to an object containing metadata 
 *  and an array `value` containing contact objects.
 */
const fetchData = async () => {
  const baseURL = 'https://api.karbonhq.com/v3/'
  const email = `${contactEmail}`
  const url = `${baseURL}Contacts?$filter=contains(EmailAddress, '${email}')`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: AUTH,
      AccessKey: KEY
    }
  })

  return await request.json()
}


// Call fetchData() and findContactByName() functions .then return the result
// done in this manner due to the way the script runs in zapiers enviroment
return fetchData()
  // DEBUG
  .then(response => {
      console.log("\nFull Response:", response);
      return response;  // Pass the response to the next .then()
  })
  .then(response => {
    // Call function with response object and contact names 
    const contact = findContactByName(response, contactFirstName, contactLastName)
    if (contact) {
      console.log({ found: true, contactFound: contact })
      return {
        found: true,
        message: 'Contact is found',
        contactFound: contact
      }
    } else {
      // console.log()
      console.log( { found: false, message: "Contact not found" })
      return {
        found: false,
        message: 'Contact not found',
        contactFound: contact
      }
    }
  })


/**
 * takes the fetchData() response and contact names as arguments
 * and returns the contact object if found else undefined.
 * @param {Object} response    - Response object containing contacts.
 * @param {string} firstName   - contact's first name.
 * @param {string} lastName    - contact's last name.
 * @returns {Object|undefined} - contact object else undefined.
 */
function findContactByName(response, firstName, lastName) {
  // using .find() to return the first contact that matches the condition
  return response.value.find(contact => {
    // defining parameters for the .find() function
    // Split FullName into parts
    let [responseLastName, responseFirstAndMiddleName] = contact.FullName.split(', ')
    
    responseLastName = responseLastName.toLowerCase().trim()
    responseFirstAndMiddleName = responseFirstAndMiddleName.toLowerCase().trim()
    
    // Compare both names
    return responseLastName === lastName && responseFirstAndMiddleName.startsWith(firstName)
    }
  )
}