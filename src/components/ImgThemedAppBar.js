import React, { useContext, useState, useEffect } from "react";
import Color from "color-thief-react";
import { ThemeContext } from "../context/themeContext";

const Loading = () => <div>Matching navbar color...</div>;
export default function ImgThemedAppBar({ imgSrc }) {

    const { handleSetPrimary } = useContext(ThemeContext)
    const [color, setColor] = useState()

    useEffect(() => {
        if (color) handleSetPrimary(color)
    }, [color])
    return (
        <div className="App">
            <Color src={imgSrc} crossOrigin="anonymous" format="hex">
                {({ data, loading }) => {
                    if (loading) return <Loading />;
                    else {
                        setColor(data)
                        return (
                            <div>
                                Chosen color: <strong>{data}</strong>
                            </div>
                        );
                    }

                }}
            </Color>
            <img src={imgSrc} alt="" />
        </div>
    );
}
