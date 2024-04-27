import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import RequirementGeneration from "./Requirement/RequirementGeneration";
import UserStoryGeneration from "./UserStory/UserStoryGeneration";
import TestCase from "TestCase/testCase";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">Login</Icon>,
  //   route: "/dashboard",
  //   component: '< />',
  // },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Requirement",
    key: "requirement",
    icon: <Icon fontSize="small">note</Icon>,
    route: "/requirement",
    component: <RequirementGeneration />,
  },
  {
    type: "collapse",
    name: "User Story Generation",
    key: "userstory",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/userstory",
    component: <UserStoryGeneration />,
  },
  {
    type: "collapse",
    name: "Test Cases Generation",
    key: "testcase",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/testcase",
    component: <TestCase />,
  },
  {
    type: "collapse",
    name: "Test Script Generation",
    key: "testscript",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/testscript",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
 
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
