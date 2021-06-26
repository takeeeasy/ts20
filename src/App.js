import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { signIn } from './auth';
import AuthRoute from './AuthRoute';

import Home from './Home';
import About from './About';
import Profile from './Profile';
import NotFound from './NotFound';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

function App() {
  //useState는 첫 번째 원소로 현재 상태, 두 번째 원소로 setter를 가져온다
  //이렇게 unpacking 하는 것을 배열 비구조화 할당이라고 한다
  const [user, setUser] = useState(null);

  const authenticated = user != null; //인증이 됐는가 true ? false

  //function login(email, password) { setUser(signIn(email, password));} 와 같음
  const login = ({ email, password }) => setUser(signIn({ email, password }));
  //logout은 user의 state를 null로 지정
  const logout = () => setUser(null);

  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        {/* authenticated이 존재하면 LogoutButton을 생성. 없으면 login버튼을 생성 */}
        {authenticated ? ( <LogoutButton logout={logout} /> )
                       : ( <Link to="/login"> <button>Login</button> </Link>
        )}
      </header>
      <hr />
      <main>
        <Switch>
          {/* exact */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/login"
            render={props => (
              <LoginForm authenticated={authenticated} login={login} {...props} />
            )}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={props => <Profile user={user} {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
