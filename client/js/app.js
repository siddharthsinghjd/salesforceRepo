function getSessionList(success, error) {
    //var soql = "SELECT sid16__Session__r.Id, sid16__Session__r.Name, sid16__Session__r.sid16__Session_Date__c, sid16__Speaker__r.sid16__First_Name__c, sid16__Speaker__r.sid16__Last_Name__c FROM sid16__Session_Speaker__c";
    var soql = "SELECT Account.Name, Account.Id, Name, Id from Contact";
    force.query(soql, success, error);
  }
  
  function getContactList(sessionId, success, error) {
    var soql = "SELECT Contact.Name, " +
    "Contact.Id " +
    "FROM Contact " +
    "WHERE Account.Id = '" + sessionId + "'";
    force.query(soql, success, error);
  }

  function getSessionDetails(sessionId, success, error) {
    var soql = "SELECT Name, " +
    "Email, " +
    "Phone, " +
    "Birthdate, " +
    "FROM Contact " +
    "WHERE Id = '" + sessionId + "'";
    force.query(soql, success, error);
  }
  
  function showSessionList() {
        (
          function (data) {
              var sessions = data.records,
                  html = '';
              for (var i=0; i<sessions.length; i++) {
                  html += '<li class="table-view-cell"><a href="#sessions/'+ sessions[i].Account.Id +'">' + sessions[i].Account.Name + '</a></li>';
              }
              html =
                  '<div class="page">' +
                  '<header class="bar bar-nav">' +
                      '<h1 class="title">Accounts</h1>' +
                  '</header>' +
                  '<div class="content">' +
                      '<ul class="table-view session-list">' + html + '</ul>' +
                  '</div>' +
                  '</div>';
              slider.slidePage($(html));
          },
          function (error) {
              alert("Error: " + JSON.stringify(error));
          });
      return false;
  }

  function showContactList() {
    (
      function (data) {
          var sessions = data.records,
              html = '';
          for (var i=0; i<sessions.length; i++) {
              html += '<li class="table-view-cell"><a href="#sessions/contact'+ sessions[i].Id +'">' + sessions[i].Name + '</a></li>';
          }
          html =
              '<div class="page">' +
              '<header class="bar bar-nav">' +
                  '<h1 class="title">Contacts</h1>' +
              '</header>' +
              '<div class="content">' +
                  '<ul class="table-view session-list">' + html + '</ul>' +
              '</div>' +
              '</div>';
          slider.slidePage($(html));
      },
      function (error) {
          alert("Error: " + JSON.stringify(error));
      });
  return false;
}
  
  function showSessionDetails(sessionId) {
  
      getSessionDetails(sessionId,
          function (data) {
              var session = data.records[0],
              html =
                  '<div class="page">' +
                  '<header class="bar bar-nav">' +
                  '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
              '<h1 class="title">Sessions</h1>' +
                  '</header>' +
                  '<div class="content">' +
                      '<div class="card">' +
                          '<ul class="table-view">' +
                              '<li class="table-view-cell">' +
                                  '<h4>' + session.Name + '</h4>' +
                                  '<p>' + (session.Email || 'No time yet')+ '</p>' +
                              '</li>' +
                              '<li class="table-view-cell">Phone: ' +
                                  session.Phone +
                              '</li>' +
                              '<li class="table-view-cell">' +
                                  (session.Birthdate || 'No description yet') +
                              '</li>' +
                          '</ul>' +
                      '</div>' +
                  '</div>' +
                  '</div>';
              slider.slidePage($(html));
          },
          function (error) {
              alert("Error: " + JSON.stringify(error));
          });
      return false;
  }
  
  var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
  router.addRoute('', showSessionList);
  router.addRoute('sessions/:id', showContactList);
  router.addRoute('sessions/contact/:id', showSessionDetails);
  
