import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import 'normalize.css';
import { RootState } from '../state';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<Props> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={() => <div>hello</div>} />
          <Route>
            <h2>Page Not Found</h2>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
