import ShallowRenderer from 'react-test-renderer/shallow';
import TopMenu from "../components/TopMenu";
import SystemButton from "../components/SystemButton";


describe("GamesByName", () => {
    it("renders", () => {
        //arrange
        const renderer = new ShallowRenderer();
        renderer.render(< TopMenu/>);

        //act
        const result = renderer.getRenderOutput();

        //assert
        expect(result.type).toBe('nav');
    }),

        it("renders its sub systembuttons", () => {
            //arrange
            const renderer = new ShallowRenderer();
            renderer.render(< TopMenu/>);

            //act
            const result = renderer.getRenderOutput();

            //assert
            expect(result.props.children).toBeDefined();
            // expect(result.props.children).toContain("< SystemButton text = \"GAMEBOY/ADVANCE\" / >");
            expect(result.props.children.length).toEqual(4);
            // expect(result.props.children).toEqual(expect.arrayContaining([< React.Fragment / >]));
        })


})

{/*// expect(result.props.children).toEqual([*/}
{/*//     <span className="heading">Title</span>,*/}
{/*//     <Subcomponent foo="bar" />*/}
