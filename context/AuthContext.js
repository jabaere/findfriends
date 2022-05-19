import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLICK_KEY } from "../utils/Constants";
import { useRouter } from "next/router";
import { serialize } from "cookie";
import { API_URL } from "../utils/Constants";
export const MAX_AGE = 60 * 60 * 8; // 8 hours
const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [announcementId, setAnnouncementId] = useState(null);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [imageLoader, setImageLoader] = useState(false);
  const [statusText, setStatusText] = useState(false);
  const router = useRouter();

  //get user id

  const getAnnouncementId = (id) => {
    setAnnouncementId(id);
  };

  //image upload
  const setImageUpload = (image) => {
    setImage(image);
  };
  ///

  const handlePictureUpload = async (image, announcementId) => {
    setImageLoader(true);
    console.log("imageupload");
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "announcements");
    formData.append("refId", announcementId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/api/upload/`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImageData(data);
    console.log(data);

    if (res.ok) {
      console.log("baro gelaa");
      setImageLoader(false);
      setStatusText(true);
    } else {
      console.log("dasda");
    }
  };

  //announcement alert

  const AlertUser = (prop) => {
    setAlert(prop);
    console.log(alert);
  };

  //handleSearch

  const handleSearch = (text) => {
    setSearchText(text);
  };

  /**
   * Log the user in
   * @param {string} email
   */

  /*
  const setTokenCookie = async (res, token) => {
    
    const cookieOptions = {
      maxAge: MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    };
    const cookie = serialize("token", token, cookieOptions);
    res.setHeader("Set-Cookie", cookie);
  };


  */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      //const token = await magic.user.getIdToken()
      //setTokenCookie(email,token)
      let encoded = window.btoa(encodeURI(email));
      localStorage.setItem("userEmail", encoded);
      setUser({ email });
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Log the user out
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
        //Add this just for test
        const token = await getToken();

        console.log("checkUserLoggedIn token", token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Retrieve Magic Issued Bearer Token
   * This allows User to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Reload user login on app refresh
   */
  useEffect(() => {
    magic = new Magic(MAGIC_PUBLICK_KEY);

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        getToken,
        AlertUser,
        alert,
        searchText,
        handleSearch,
        announcementId,
        getAnnouncementId,
        setImageUpload,
        image,
        handlePictureUpload,
        imageData,
        imageLoader,
        statusText,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
