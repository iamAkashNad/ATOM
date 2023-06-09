![ATOM Screenshot](https://i.imgur.com/4batMif.png)

# ATOM - A Code Editor x Compiler

This project is a MERN Stack project.And it Supports C, C++, Java, JavaScript & Python.

## Tools & Dependencies

- [React.js](https://react.dev/) is used for frontend.
- [Node.js](https://nodejs.org/en/docs) is used for writing js in backend & along with [Express.js](https://expressjs.com/en/5x/api.html) framework is used.
- [MongoDB](https://www.mongodb.com/docs/) is used for store jobs related to codes submitted by different users.
- [Mongoose](https://mongoosejs.com/docs/guide.html) is used for establishing connection between node server and mongo server.
- [Bull](https://github.com/OptimalBits/bull) is used for queue the jobs in a correct manner.
- [uuid](https://www.npmjs.com/package/uuid) package is used for generating unique ids for giving name of the code file in backend.
- [fs-extra](https://www.npmjs.com/package/fs-extra) package is used for deleting the code file after the execution is over in backend.

## Workflow

- In frontend an user submit his/her written code alongside with the language to the ``/run`` endpoint.
- For that endpoint in the corresponded controller action, backend first check the submitted data is valid or not. if not return a 400(bad request) response, But if the data is valid then I first create a file for the code content and give an unique name to that file and adds an extension as per the language of the code which comes with request. That code file will save in ``/codes`` folder. After that I create a job for the code file with its path and language & save it to the database with status pending. And after that push the ``_id`` field value of that job to the queue which is managed by **bull**. And after that I send the ``_id`` value of that job as response to the frontend.
- In frontend, when I receive the jobId for the submitted code then in **react** I started to send rendom request to the ``/status`` endpoint with an query parameter ``id=\\jobId\\`` per 500ms until It doesn't get the job detail as response which has ``job.status !== "Pending"``.
- In backend, for ``/status`` endpoint in the corresponding controller action I simply send back the job details as response for that job Id came with the request to this endpoint. And if the job is not pending after sending the response I delete the job from database.
- The job ids are poped from the front of the queue and assign to any of the free worker by **bull** and the code file(which is led by the path which is store in that job for that corresponding job Id) is executes in the background and when the execution for that code file is over, the **output/error** is store in that job in database with a updated status **success/error**. And if the execution of that code file takes too long for an example more than 1 minute, I simply stop the execution and set the status for the job of that code file as **Timeout**. And when the execution of the code file is over, I delete the code file.

## Feature In Editor

- As an user, You can change the theme of the editor as your preference.
- You can change font size for the code in the editor.
- For increasing your coding speed you can enable the **autocomplete** option.
- You can use the editor both from your laptop and phone.

## Purpose

This editor's main audience are the begginers who just start coding. I basically want to less the pain of installing this and that environment & software for coding. And also the pain of signup & login and then remember the credentials before start coding on any online editor. In **ATOM**, you just need a laptop or mobile and internet to start coding. 
***Simple & Easy!***
