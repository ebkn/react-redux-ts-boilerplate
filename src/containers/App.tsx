import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dispatch, Action } from 'redux';
import 'normalize.css';
import { RootState } from '../state';

interface StateProps {}
interface DispatchProps {}
interface Props extends StateProps, DispatchProps {}

class App extends React.Component<Props> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={routeProps => <div {...routeProps}>hello</div>} />
          <Route>
            <h2>Page Not Found</h2>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({});
const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): DispatchProps => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
