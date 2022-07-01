import GamesByName from "../pages/GamesByName";
import ShallowRenderer from 'react-test-renderer/shallow';
import SystemButton from "../components/SystemButton";


describe("GamesByName", () => {
    it("renders", () => {
        //arrange
        const renderer = new ShallowRenderer();
        renderer.render(< GamesByName/>);

        //act
        const result = renderer.getRenderOutput();

        //assert
        expect(result.type).toBe('div');
        // const test = {classname: "bars"};
        // expect(result.props.children).toEqual(expect.not.objectContaining(test));


    })
    ,

    it("renders systembutton", () => {
        //arrange
        const renderer = new ShallowRenderer();
        renderer.render(< GamesByName/>);

        //act
        const result = renderer.getRenderOutput();

        //assert

        const searchbar =  <input className="searchbar"
                                  type="text"
                                  onChange={(e) => toggleSearchName(e.target.value)}
                                  placeholder="zoek game op naam"
        />  ;

        expect(result.toString()).toContain(searchbar);
        // expect(result(<SystemButton/>)).toBeInTheDocument();

    })
})





