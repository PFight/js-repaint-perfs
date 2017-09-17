
class DbmonComponent {
    constructor() {
        this.databases = [];
        
        this.loadSamples = this.loadSamples.bind(this);        
        this.loadSamples();
    }
    
    loadSamples() {
        this.databases = ENV.generateData().toArray();
        this.render();
        Monitoring.renderRate.ping();
        setTimeout(this.loadSamples, ENV.timeout);
    }
    
   render() {
    return (
      div("root", {}, [
        table("table", {className:"table table-striped latest-data"}, [
          tbody("tbody", {},
            this.databases.map((database) =>
                tr(database.dbname, {}, [
                    td(database.dbname + "dbname", {className: "dbname"}, database.dbname),
                    td(database.dbname + "qeury-count", {className: "query-count"}, [
                      span(database.dbname + "query-count-span", {className: database.lastSample.countClassName},
                        database.lastSample.nbQueries.toString()
                      )
                    ]),
                    ...database.lastSample.topFiveQueries.map((query, index) =>
                        td(database.dbname + "query" + index, { className: "Query " + query.elapsedClassName }, [
                          span(database.dbname + "query" + index + "-elapsed", {}, query.formatElapsed.toString()),
                          div(database.dbname + "query" + index + "-popover", { className: "popover left" }, [
                            div(database.dbname + "query" + index + "-popover-content", {className: "popover-content"}, query.query),
                            div(database.dbname + "query" + index + "-popover-arrow", {className:"arrow"}, [])
                          ])
                        ])
                    )
                ])
            )
          )
        ])
      ])
    );
  }
}

mount(document.getElementById("app"),
    (new DbmonComponent()).render()
);