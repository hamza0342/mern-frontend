import {Route, Switch} from 'react-router-dom';
import AdminRouter from "./authentication/AdminRouter";
import ClientRouter from "./authentication/ClientRouter";
import GCRouter from "./authentication/GcRouter";
import Home from './pages';
import SigninPage from './pages/Admin/signin';
import AdminDashboard from "./pages/Admin/admindashboard";
import ClientDashboard from "./pages/Client/clientdashboard";
import GCDashboard from "./pages/GC/gcdashbaord";
import ProjectDetails from './pages/Client/projectDetails';
import ClientSignin from "./pages/Client/clientSignin";
import Model_window from './pages/Client/New_windows/Model_window';
import SubContractorSignIn from "./pages/GC/gcSignin";
import ProfileScreen from "./pages/Client/ProfileScreen";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EditClient from "./pages/Client/EditClient"
import Files from './pages/Client/Files';
import Delete from './pages/Client/Delete';
import Files_360 from './pages/Client/Files_360';
import Mir_file from './pages/Client/Mir_file';
import GcProjectDetail from './pages/GC/GcProjectDetail';
import Gc_Files_360 from './pages/GC/Gc_Files_360';
import GC_Files from './pages/GC/GC_Files';
import GC_Mir_File from './pages/GC/GC_Mir_File';
import Admin_projectDetails from './pages/Admin/Admin_projectDetails'
import Proectdisplay from './pages/Admin/projectdisplay'
import Admin_Files_360 from './pages/Admin/Admin_Files_360';
import Admin_Files from './pages/Admin/Admin_Files';
import Admin_Mir_file from './pages/Admin/Admin_Mir_file';
import Chat from './pages/Client/Chat';
import GC_Chat from './pages/GC/GC_Chat';
import UploadLink from './pages/Client/uploadLink';
//import Forge from './pages/Client/Forge/Forge';


const MainRouter = () => {
    return(
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/signin" component = {Home} />
            <Route path="/client/signin" component={Home} />
            <Route path="/model" component={Model_window}/>
            <Route path="/back/:_id" component={ProjectDetails}> </Route>
            <Route path="/del/:_id" component={Delete}></Route>
            <Route path="/folder/:_id" component={Files}></Route>
            <Route path="/Admin_folder/:id" component={Admin_Files}/>
            <Route path="/360files/:id" component={Files_360}></Route>
            <Route path="/Admin_Files_360/:id" component={Admin_Files_360}/>
            <Route path="/mirfile/:id" component={Mir_file}></Route>
            <Route path="/admin_mirfile/:id" component={Admin_Mir_file}/>
            <Route path="/gc/signin" component={ Home } />
            <Route path="/client/openchat" component={Chat}/>
            <Route path="/linkpage" component={UploadLink}/>
            <Route path="/gc/openchat" component={GC_Chat}/>
            <Route path="/gc360files/:id" component={Gc_Files_360}></Route>
            <Route path="/pdf/:name"/>
            <Route path="/gc_folder/:_id" component={GC_Files}></Route>
            <Route path="/gc_mirfile/:id" component={GC_Mir_File}></Route>
            <Route path="/adminproject/:id" component={Proectdisplay} />
            <Route path="/viewProjects/:id/:clientid" component={Admin_projectDetails}/>
            <Route path="/client/dashboard/edit/:clientId" component={EditClient} />
            <ClientRouter path="/project/:projectId" component = {ProjectDetails} exact/>
            <AdminRouter path="/admin/dashboard" component={AdminDashboard} />
            <ClientRouter path="/client/dashboard" component={ClientDashboard} />
            <ClientRouter path="/client/profile" component={ProfileScreen} />
            <GCRouter path="/gc/dashboard" component={GCDashboard} />
            <GCRouter path="/gcproject/:projectId" component={GcProjectDetail} />

            <Route><ErrorPage /></Route>
       </Switch>
    );
}

export default MainRouter;