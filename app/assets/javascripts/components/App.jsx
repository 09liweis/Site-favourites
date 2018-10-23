class Appbk extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home}></Route>
            </Router>
        );
    }
}