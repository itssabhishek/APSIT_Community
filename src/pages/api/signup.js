export default function signup(req, res) {
  const userDeatails = {
    name: req.body.user_name,
    moodleID: req.body.user_moodleID,
    email: req.body.user_email,
    password: req.body.user_password,
  };
}
