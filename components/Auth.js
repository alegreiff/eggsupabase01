const Auth = ({ supabase }) => {
  const signInWithGitHub = () => {
    supabase.auth.signIn({
      provider: "github",
    });
  };
  return (
    <div>
      <button onClick={signInWithGitHub}>Log in with GitHub</button>
    </div>
  );
};

export default Auth;
