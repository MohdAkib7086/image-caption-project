import React, { useContext, createContext } from 'react';

// Mock authentication service
const authContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = React.useState(null);

    const signin = (cb) => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = (cb) => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

const fakeAuth = {
    isAuthenticated: false,
    signin(callback) {
        fakeAuth.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback) {
        fakeAuth.isAuthenticated = false;
        setTimeout(callback, 100); // fake async
    },
};
