import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            navigate("/error")
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        })

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        // Toggle GPT Search button
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">

        <img className="w-44 mx-auto md:mx-0" /*src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"*/ src={LOGO} alt="logo" />
        {user && (
            <div className="flex p-2">
                {showGptSearch && (<select className="p-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                    {
                        SUPPORTED_LANGUAGES.map((lang) => (
                            <option key={lang.identifier} value={lang.identifier}>
                                {lang.name}
                            </option>
                        ))
                    }
                </select>)}
                <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
                <img className="hidden md:block w-12 h-12" alt="usericon" src={user?.photoURL} />
                <button onClick={handleSignOut} className="font-bold text-white ">
                    (Sign Out)
                </button>
            </div>)}
    </div>
}

export default Header;

/*bg-gradient-to-b from-black"*/