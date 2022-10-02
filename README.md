# Social Media API

## Table of contents

---

> [Description](#description)
>
> [Installation](#installation)
>
> [Usage](#usage)
>
> [Licenses](#licenses)
>
> [Contributions](#contributions)
>
> [Tests](#tests)
>
> [Questions](#questions)

## Description

---

This is the backend data routing using a Mongo Database for creating a social media platform allowing the creation and deletion of users, posts and reactions to those posts. The models make sure that the data entered is consistent with the controllers on the routes making it so that when requests are made to the database the correct associated data is updated or created. This includes things such as when a new thought(post) is created it adds the \_id to an array on the associated user, when a friend is added it reciprocally adds the user to the friends friend list and reverse when a friend is removed, and when a user is deleted all of their associated thoughts are deleted as well.

## Usage

---

This can be used for making a full stack social media application and this same type of routing can be easily adapted to other backend database calls.

## Installation

---

This project can be downloaded and installed, running npm install to download the dependencies.

## License

---

Licensed with the ISC license : ![License Badge](https://img.shields.io/badge/license-ISC-green)

## Contributions

---

## Tests

---

## Questions

---

If you have any questions you can reach out on my GitHub at:

[TateFoster](https://github.com/TateFoster)

or email me at:

[tate.j.foster@gmail.com](mailto:tate.j.foster@gmail.com)
