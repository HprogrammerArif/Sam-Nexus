import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'

  const { signInWithGoogle, loading, githubLogin, saveUser } =
  useAuth()


  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      const googleSignUser = await signInWithGoogle()
      //console.log(googleSignUser, googleSignUser?.user?.email);

      navigate(from)
      toast.success('Signup Successful')

      //save user for role
      await saveUser(googleSignUser?.user?.email, googleSignUser?.user?.displayName, googleSignUser?.user?.photoURL);
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // handle github signin
  const handleGithubLogin = async () => {
    try {
      const githubSignUser = await githubLogin()
      console.log(githubSignUser, githubSignUser?.user?.email);
      navigate(from)
      toast.success('Signup Successful')

      //save user for role
      await saveUser(githubSignUser?.user?.email, githubSignUser?.user?.displayName, githubSignUser?.user?.photoURL);
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }


  // handle twiter signin
  const handleTwiterSignIn = async () => {
    try {
      // await githubLogin()

      // navigate(from)
      toast.success('Comming soonn')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div>
      <button
      disabled={loading}
        onClick={handleGoogleSignIn}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaGoogle className="w-5 h-5 fill-current"></FaGoogle>
        
      </button>
      <button
      disabled={loading}
        onClick={handleGithubLogin}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaGithub className="w-5 h-5 fill-current"></FaGithub>
        
        
      </button>
      <button
      disabled={loading}
        onClick={handleTwiterSignIn}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaTwitter className="w-5 h-5 fill-current"></FaTwitter>
        
      </button>
    </div>
  );
};

export default SocialLogin;
