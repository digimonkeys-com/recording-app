import Route from './Router/Router';
import Form from './Form/Form';
import Recording from './Recording/Recording'
import Upload from './Upload/Upload';
import Status from './Status/Status';

import './app.css'

const App = () => {
  return (
    <div className="wrap">
      <Route path="/sign-in">
        <Form />
      </Route>
      <Route path="/">
        <Recording />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route path="/status">
        <Status />
      </Route>
    </div>
  );
}

export default App;
