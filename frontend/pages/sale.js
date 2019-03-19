/* /pages/realty.js */
import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import ImageGallery from 'react-image-gallery';

import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";

class Realty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: { loading, error, realty },
      router,
      context,
      isAuthenticated
    } = this.props;
    if (error) return "Error Loading Realty";

    if (realty) {
      return (
        <>
          <h1>{realty.name}</h1>
          <ImageGallery items={realty.images} />
          <Row>
            <Col >
              <div>
                {realty.sale && <Card
                    style={{ width: "30%", margin: "0 10px" }}
                    key={realty.sale.id}
                  >
                    <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${realty.images[0].url}`}
                    />
                    <CardBody>
                      <CardTitle>{realty.name} en Venta</CardTitle>
                      <CardText>{realty.sale.description}</CardText>
                    </CardBody>
                    <div className="card-footer">
                      {/* <Button outline color="primary">
                        + Add To Cart
                      </Button> */}
                    </div>
                  </Card>
                }
                <style jsx>
                        {`
                          a {
                            color: white;
                          }
                          a:link {
                            text-decoration: none;
                            color: white;
                          }
                          .container-fluid {
                            margin-bottom: 30px;
                          }
                          .btn-outline-primary {
                            color: #007bff !important;
                          }
                          a:hover {
                            color: white !important;
                          }
                        `}
                      </style>
              </div>
            </Col>
          </Row>
        </>
      );
    }
    return <h1>Loading</h1>;
  }
}

const GET_REALTY = gql`
  query($id: ID!) {
    realty(id: $id) {
        id
        name
        description
        visible
        images {
            id
          url
          original : url
          thumbnail : url
        }
        lease {
          id
          description
          amount
          available
        }
        sale {
          id
          description
          amount
          available
        }
    }
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RealtyList)

export default compose(
  withRouter,
  graphql(GET_REALTY, {
    options: props => {
      return {
        variables: {
          id: props.router.query.id
        }
      };
    },
    props: ({ data }) => ({ data })
  })
)(Realty);