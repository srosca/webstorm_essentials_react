window.React = React;
var Router = window.ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;


var entries = [
    {
        "title": "Hello, WebStorm!",
        "content": "Today we are going to speak about WebStorm and its features"
    }, {
        "title": "Immersing into WebStorm",
        "content": "WebStorm provides a bunch of advanced technologies, which help us increase our development efficiency"
    }
];

var Entries = React.createClass({

    render: function () {
        var items = entries.slice().reverse().map(function (entry) {
            var sumary = entry.content.split(" ").slice(0, 5).join(" ");
            var index = entries.indexOf(entry);
            return (
                <EntryItem
                    index={index}
                    title={entry.title}
                    sumary={sumary}
                    />
            );
        }, this);
        return (
            <article>
                {items}
            </article>
        );
    }
});

var EntryItem = React.createClass({
    render: function () {
        return (
            <div>
                <h1><a href={'#/entry/' + this.props.index}>{this.props.title}</a></h1>
                <p>
                    {this.props.sumary}
                    <a href={'#/entry/' + this.props.index}>... (read more)</a>
                </p>
            </div>
        );
    }
});

var Entry = React.createClass({
    render: function () {
        var id = this.props.params.id;
        var entry = entries[id];
        return(
            <article>
                <h1>{ entry.title }</h1>
                <p>{entry.content}</p>
                <p><a href="#/">Go back</a></p>
            </article>
        );
    }
});

var NewEntry = React.createClass({
    mixins: [Router.Navigation],

    handleSubmit : function(){
        var title = this.refs.title.getDOMNode().value,
            content = this.refs.content.getDOMNode().value;

        entries.push({
            title: title,
            content: content
        });
        this.transitionTo('/');
        //Navigation.transitionTo('/');
    },
    render: function () {

        return(
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" ref="title"/>
                </div>


                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" rows="5" ref="content"></textarea>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Save</button>
                    <button type="submit" className="btn btn-default">Clear</button>
                </div>
            </form>
        );
    }
});


var App = React.createClass({
    render: function () {
        return (
            <div>
                <RouteHandler/>
            </div>
        )
    }
});

var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute name="Home" handler={Entries}/>
        <Route path="/entry/:id" handler={Entry}/>
        <Route path="/new-entry/" handler={NewEntry}/>
    </Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
    React.render(<Root />, document.getElementById('app'));
});