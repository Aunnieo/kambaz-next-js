import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard-courses">
        
      {/* ================= Course 1 ================= */}
      <div className="wd-dashboard-React">
        <Link href="/Courses/1234" className="wd-dashboard-course-link">
          {/* Thumbnail Image */}
          <Image
            src="/images/reactjs.jpg"
            width={200}
            height={150}
            alt="React JS course thumbnail"
          />

          {/* Course Info */}
          <div>
            <h5>CS1234 React JS</h5>
            <p className="wd-dashboard-course-title">
              Full Stack Software Developer
            </p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 2 ================= */}
      <div className="wd-dashboard-SCHM3308">
        <Link href="/Courses/3308" className="wd-dashboard-course-link">
          <Image
            src="/images/3308.jpg"
            width={200}
            height={150}
            alt="SCHM 3308 Supply Chain Analytics thumbnail"
          />
          <div>
            <h5>SCHM 3308</h5>
            <p className="wd-dashboard-course-title">Supply Chain Analytics</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 3 ================= */}
      <div className="wd-dashboard-SCHM3305">
        <Link href="/Courses/3305" className="wd-dashboard-course-link">
          <Image
            src="/images/sourcing.png"
            width={200}
            height={150}
            alt="SCHM 3305 Sourcing & Negotiation thumbnail"
          />
          <div>
            <h5>SCHM 3305</h5>
            <p className="wd-dashboard-course-title">
              Sourcing and Negotiation
            </p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 4 ================= */}
      <div className="wd-dashboard-Fundies1">
        <Link href="/Courses/Fundies1" className="wd-dashboard-course-link">
          <Image
            src="/images/fundies1.png"
            width={200}
            height={150}
            alt="Fundies 1 thumbnail"
          />
          <div>
            <h5>CS Fundies 1</h5>
            <p className="wd-dashboard-course-title">Foundations of CS 1</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 5 ================= */}
      <div className="wd-dashboard-Fundies2">
        <Link href="/Courses/Fundies2" className="wd-dashboard-course-link">
          <Image
            src="/images/fundies2.webp"
            width={200}
            height={150}
            alt="Fundies 2 thumbnail"
          />
          <div>
            <h5>CS Fundies 2</h5>
            <p className="wd-dashboard-course-title">Foundations of CS 2</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 6 ================= */}
      <div className="wd-dashboard-DiscreteMaths">
        <Link
          href="/Courses/DiscreteMaths"
          className="wd-dashboard-course-link"
        >
          <Image
            src="/images/discrete.png"
            width={200}
            height={150}
            alt="Discrete Mathematics thumbnail"
          />
          <div>
            <h5>MATH 2301</h5>
            <p className="wd-dashboard-course-title">Discrete Mathematics</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 7 ================= */}
      <div className="wd-dashboard-Strategy">
        <Link href="/Courses/Strategy" className="wd-dashboard-course-link">
          <Image
            src="/images/strategy.jpeg"
            width={200}
            height={150}
            alt="Strategy in Action thumbnail"
          />
          <div>
            <h5>MGMT 4100</h5>
            <p className="wd-dashboard-course-title">Strategy in Action</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

      {/* ================= Course 8 ================= */}
      <div className="wd-dashboard-OrgB">
        <Link href="/Courses/OrgB" className="wd-dashboard-course-link">
          <Image
            src="/images/orgb.png"
            width={200}
            height={150}
            alt="Organizational Behavior thumbnail"
          />
          <div>
            <h5>MGMT 2200</h5>
            <p className="wd-dashboard-course-title">Organizational Behavior</p>
            <button>Go</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
