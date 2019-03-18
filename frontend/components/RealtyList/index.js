/* components/RealtyList/index.js */
import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

const RealtyList = (
  { data: { loading, error, realties }, search },
  req
) => {
  if (error) return "Error loading realties";
  //if realties are returned from the GraphQL query, run the filter query
  //and set equal to variable realtySearch

  if (realties && realties.length) {
    //searchQuery
    var searchQuery = realties.filter(query =>
      query.name.toLowerCase().includes(search) && query.visible === true
    );
    if (searchQuery.length != 0) {
      return contentToRender(searchQuery);
    }
     else {
        searchQuery = realties.filter(query =>
            query.description.toLowerCase().includes(search) && query.visible === true
        );
            if (searchQuery.length != 0) {
                return contentToRender(searchQuery);
              }
               else {
                return <h1>No Realties Found</h1>;
            }
        }
  }
  return <h1>Loading</h1>;
};

const query = gql`
  {
    realties {
      id
      name
      description
      visible
      images {
        url
      }
      lease {
        id
      }
      sale {
        id
      }
    }
  }
`;

var contentToRender = (searchQuery) => {
    return (<div>
    <div className="h-100">
      {searchQuery.map(res => (
        <Card
          style={{ width: "30%", margin: "0 10px" }}
          className="h-100"
          key={res._id}
        >
          <CardImg
            top={true}
            style={{ height: 250 }}
            src={`http://localhost:1337${res.images[0].url}`}
          />
          <CardBody>
            <CardTitle>{res.name}</CardTitle>
            <CardText>{res.description}</CardText>
          </CardBody>
           <div className="card-footer">
           {res.lease && <Link
              as={`/leases/${res.lease.id}`}
              href={`/leases?id=${res.lease.id}`}
            >
              <a className="btn btn-primary">Arriendo</a>
            </Link>}
            {res.sale && <Link
              as={`/sales/${res.sale.id}`}
              href={`/sales?id=${res.sale.id}`}
              visible={res.sale}
            >
              <a className="btn btn-primary">Venta</a>
            </Link>}
          </div>
        </Card>
      ))}
    </div>
    
    <style jsx global>
      {`
        a {
          color: white;
        }
        a:link {
          text-decoration: none;
          color: white;
        }
        a:hover {
          color: white;
        }
        .card-columns {
          column-count: 3;
        }
      `}
    </style>
    </div>);
    }

RealtyList.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RealtyList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(RealtyList);