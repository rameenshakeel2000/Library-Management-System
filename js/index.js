let itemIndex=-1;
let bookList={};

$(document).ready(function()
{
    if (localStorage.getItem("lms") === null || localStorage.getItem("lms") === ""  ) 
    {
       $("#bookFound").hide();
       $("#noBook").show();
        localStorage.setItem("lms", "");
        localStorage.setItem("lmsItemIndex", -1);
        }
    else
    {
         $("#noBook").hide();
         $("#bookFound").show();
         itemIndex = localStorage.getItem("lmsItemIndex");
         displaybooks();
        }
 });

function addBook()
 {
    let book={};
        book.id=++itemIndex;
        book.bookName=bookForm.bookName.value;
        book.authorName=bookForm.authorName.value;
        book.publisherName=bookForm.publisherName.value;
        book.datePublished=bookForm.datePublished.value;

         if(localStorage.getItem("lms")!=="")
        bookList=JSON.parse(localStorage.getItem("lms"));
        bookList["id"+itemIndex]=book;

         let bookDataString = JSON.stringify(bookList);
        localStorage.setItem("lms",bookDataString);        
        localStorage.setItem("lmsItemIndex",itemIndex);
        {
            alert("Book sucessfully added");
        }
 }

function displaybooks()
 {
    let bookLists=JSON.parse(localStorage.getItem("lms"));
     for(let key in bookLists)
     {
        let row = $("<tr />")
         $("#booksList").append(row); 
         row.append($("<td>" + bookLists[key].id + "</td>"));
         row.append($("<td>" + bookLists[key].bookName + "</td>"));
         row.append($("<td>" + bookLists[key].authorName+ "</td>"));
         row.append($("<td>" + bookLists[key].publisherName + "</td>"));
         row.append($("<td>" + bookLists[key].datePublished + "</td>"));
     }
  }

$(document).ready(function()
  {
    $("#purgeLibrary").click(function()
    {
        if( confirm("Are you sure you want to delete this book from Library?"))
        {
            localStorage.removeItem("lms");
            localStorage.removeItem("lmsItemIndex");
            location.reload();
        } 
    });
});

$(document).ready(function()
{
    if($('body').is('#authors_page'))
    {
        let newArrayOfObjectData=Object.values(JSON.parse(localStorage.getItem("lms")));
        let byAuthor = newArrayOfObjectData.groupBy('authorName');

        let arrayOfAutherName= Object.keys(byAuthor);
        for(let i=0; i<arrayOfAutherName.length; i++)
        {
            autherObjects = byAuthor [arrayOfAutherName[i]];
            let row = $("<tr />")
            $("#authorTable").append(row); 
            row.append($("<td>" +arrayOfAutherName[i]  + "</td>"));
            let books="";
                for(let j=0; j<autherObjects.length; j++)
                {
                  j==autherObjects.length-1?  books += autherObjects[j].bookName + " ":books+= autherObjects[j].bookName + ", ";  
                }
                row.append($("<td>" +  books + "</td>"));
                row.append($("<td>" +  autherObjects.length + "</td>"));
        }
      }
});

Array.prototype.groupBy = function(prop) 
{
    return this.reduce(function(groups, item) 
    {
        let val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

$(document).ready(function()
  {
    if($('body').is('#publishers_page'))
    {
        let newArrayOfObjectData=Object.values(JSON.parse(localStorage.getItem("lms")));
        let byPublisher = newArrayOfObjectData.groupBy('publisherName');

        let arrayOfPublisherName= Object.keys(byPublisher);
        for(let i=0;i<arrayOfPublisherName.length;i++)
        {

            publisherObjects=byPublisher[arrayOfPublisherName[i]];
            let row = $("<tr />")
            $("#publisherTable").append(row); 
            row.append($("<td>" +arrayOfPublisherName[i]  + "</td>"));
            let books="";
                for(let j=0; j<publisherObjects.length; j++)
                {
                  j == publisherObjects.length-1?  books+= publisherObjects[j].bookName + " ":books+= publisherObjects[j].bookName + ", ";  
                }
                row.append($("<td>" +  books + "</td>"));
                row.append($("<td>" +  publisherObjects.length + "</td>"));
        }
      }
}); 
