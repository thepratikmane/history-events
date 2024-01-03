import React from 'react'


//this Props interface is designed to be used with a React component, and it specifies that the component expects a selectedCategory property, which is a function (React.Dispatch) that can be used to update the state of type string | null.
interface Props {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

function Filter({ setSelectedCategory }: Props) {

    const categories = [
        "War",
        "Art",
        "Science",
        "Politics",
        "Religion",
        "Sports",
        "Other",
    ];

    const [theme, setTheme] = React.useState("dark-theme");

    React.useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const changeTheme = () => {
        if (theme === "light-theme") {
            setTheme("dark-theme")
        } else {
            setTheme("light-theme");
        }
    }

    return (
        <div className='filter'>
            <div className="filter_select">
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="theme-toggler">
                <input
                    type="checkbox"
                    id="theme-toggler_checkbox"
                    className="theme-toggler_checkbox"
                    onClick={changeTheme}
                />

                <label
                    htmlFor="theme-toggler_checkbox"
                    className="theme-toggler_label"
                >Toggle</label>
            </div>

        </div >
    )
}

export default Filter