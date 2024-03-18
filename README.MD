# Karbon API request : Find Contact by Email, First Name, and Last Name

This script is designed to run in Zapier and works as a replacement for the prebuilt find contact zap with additional logic to deal with different clients who use the same email 

it sends a request to the Karbon API to fetch a list of contacts using a provided email address. It then `returns the first contact in the returned list that matches both the provided first name and last name`.

> NOTE: This documentation is a first pass and may be missing some explanation and context, I aim to update this README in future

## Example Usage 

In our business we have a number of clients who are couples sharing the same email address, this script helps us automatically create work items for the correct client who books with us on Calendly 

creation of Karbon work items can be done via API requests using Zapier's built-in HTTP request functions, I will release a tutorial on this in future

## Requirements

- A Karbon account with access to API credentials.
- A Zapier account to set up the automation.
- Basic understanding of JavaScript and how to insert scripts in Zapier.

## Configuration

Before using this script in Zapier, you need to configure it with your Karbon API credentials:

1. **Auth Token and Access Key**: Replace `<your auth here>` and `<your key here>` in the script with your actual Karbon `Bearer` auth token and access key.

```javascript
const AUTH = 'Bearer <your auth here>';
const KEY = '<your key here>';
```

Ensure you understand the security implications of embedding credentials directly in scripts.

## Usage

1. **Setup in Zapier**: Create a new Zap and use a trigger of your choice (e.g., a new form submission that collects a contact's email, first name, and last name).
2. **Run JavaScript Action**: Select the "Code by Zapier" action and choose "Run JavaScript".
3. **Input Data**: Configure the input data fields to match the trigger's output, specifically for `contactEmail`, `contactFirstName`, and `contactLastName`.
4. **Paste the Script**: Copy the provided JavaScript code into the "Code" section of the Zapier action, with your Auth and Key.
5. **Test and Continue**: Follow Zapier's prompts to test the script and ensure it's working as expected.

## Security Note

Embedding authentication and API keys directly in scripts is not considered best practice due to security concerns. However, given the constraints of using scripts in Zapier without building a custom solution through the developer platform, this the current solution. Please be cautious and ensure these credentials are not exposed publicly or to unauthorized individuals.

## Disclaimer

This script is provided as-is, without warranty of any kind. By using this script, you acknowledge the potential security implications of embedding sensitive credentials in your scripts.