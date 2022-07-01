import AdminPage from "../pages/adminpage/AdminPage";
import ShallowRenderer from 'react-test-renderer/shallow';
import React from "react";


describe("AdminPage", () => {
    it("renders", () => {
        //arrange
        const renderer = new ShallowRenderer();
        renderer.render(< AdminPage/>);

        //act
        const result = renderer.getRenderOutput();

        //assert
        // expect(result.type).toBe(Symbol(react.fragment));
        // const test = {classname: "bars"};
        expect(result.props.children).toContain("</button>");

    })

})
