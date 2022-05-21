import handleSubmit from "../pages/SignIn";

test("SignIn", async () => {
    //arrange
    const SignInMock = jest.fn();
    SignInMock.mockReturnValue('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MTU5MjI0OCwiaWF0IjoxNjUwNzI4MjQ4fQ.5T2kfh7KTTk2cebYfOTKdRGkHwHnEJD_TbQj5PI-fhw');

    //act
    const result = await SignInMock();

    //assert
    expect(result).toBe('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MTU5MjI0OCwiaWF0IjoxNjUwNzI4MjQ4fQ.5T2kfh7KTTk2cebYfOTKdRGkHwHnEJD_TbQj5PI-fhw');


})