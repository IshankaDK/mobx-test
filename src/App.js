import React from "react";

import {useLocalStore, useObserver} from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({children}) => {
    const store = useLocalStore(() => ({
        bugs: ["Bug 01"],
        addBug: (bug) => {
            store.bugs.push(bug);
        },
        get bugsCount() {
            return store.bugs.length;
        }
    }))

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

const BugHeader = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => (
        <h1>{store.bugsCount} Bugs!</h1>
    ))
}

const BugList = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => (
        <ul>
            {store.bugs.map(bug => (
                <li key={bug}>{bug}</li>
            ))}
        </ul>
    ));
}

const BugsForm = () => {
    const store = React.useContext(StoreContext);
    const [bug, setBug] = React.useState("")

    return (
        <form onSubmit={e => {
            store.addBug(bug)
            setBug("")
            e.preventDefault()
        }}>
            <input type={"text"} value={bug} onChange={e => setBug(e.target.value)}/>
            <button type={"submit"}>Add</button>
        </form>
    )
}

function App() {
    return (
        <StoreProvider>
            <main style={{'display':'flex','flex-direction':'column','justify-content':'center','align-items':'center'}}>
                <BugHeader/>
                <BugList/>
                <BugsForm/>
            </main>
        </StoreProvider>
    );
}

export default App;
