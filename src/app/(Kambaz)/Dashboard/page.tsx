import Link from "next/link";
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          
          {/* ================= Course 1 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/1234/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/reactjs.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS1234 React JS</CardTitle>
                  <CardText style={{ height: "100px" }}>Full Stack Software Developer</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 2 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/3308/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/3308.jpg" height={160} />
                <CardBody>
                  <CardTitle>SCHM 3308</CardTitle>
                  <CardText style={{ height: "100px" }}>Supply Chain Analytics</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 3 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/3305/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/sourcing.png" height={160} />
                <CardBody>
                  <CardTitle>SCHM 3305</CardTitle>
                  <CardText style={{ height: "100px" }}>Sourcing and Negotiation</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 4 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/Fundies1/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/fundies1.png" height={160} />
                <CardBody>
                  <CardTitle>CS Fundies 1</CardTitle>
                  <CardText style={{ height: "100px" }}>Foundations of CS 1</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 5 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/Fundies2/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/fundies2.webp" height={160} />
                <CardBody>
                  <CardTitle>CS Fundies 2</CardTitle>
                  <CardText style={{ height: "100px" }}>Foundations of CS 2</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 6 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/DiscreteMaths/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/discrete.png" height={160} />
                <CardBody>
                  <CardTitle>MATH 2301</CardTitle>
                  <CardText style={{ height: "100px" }}>Discrete Mathematics</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 7 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/Strategy/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/strategy.jpeg" height={160} />
                <CardBody>
                  <CardTitle>MGMT 4100</CardTitle>
                  <CardText style={{ height: "100px" }}>Strategy in Action</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* ================= Course 8 ================= */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Course/OrgB/Home" className="text-decoration-none text-dark">
                <CardImg variant="top" src="/images/orgb.png" height={160} />
                <CardBody>
                  <CardTitle>MGMT 2200</CardTitle>
                  <CardText style={{ height: "100px" }}>Organizational Behavior</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
}