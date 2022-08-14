import MenuButton from "./MenuButton";

function SearchBarWithButtonForm({onsubmitAction, className, onChangeAction, placeHolderText}) {

    //standaard from met zoekbalk en zoekknop en
    //en standaard atributen

    return (
        <form
            onSubmit={onsubmitAction}>
            <input
                className={className}
                type="text"
                onChange={onChangeAction}
                placeholder={placeHolderText}
            />
            <MenuButton className="searchbutton" buttonType="submit" text="nu zoeken"/>
        </form>
    );
}

SearchBarWithButtonForm.defaultProps = {
    className: "searchbar",
}

export default SearchBarWithButtonForm;