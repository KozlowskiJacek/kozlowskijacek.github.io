import React from 'react'
import workInProgress from "../assets/img/test.jpg";

const TheyTrustedMe = () => {
  return (
    <section>
      <div>
        <h2>They trusted <span>Me</span></h2>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veniam
          quidem accusantium eius veritatis dignissimos sequi ut nisi facilis
          quaerat nemo laborum reprehenderit, deserunt, explicabo voluptate
          labore, sed omnis blanditiis quasi incidunt inventore eveniet. Placeat
          maiores iure, quibusdam vitae, sed laborum vero culpa, sit dolor
          praesentium vel animi quae consequatur?
          </p>
      </div>
      <div>
        <div>
          <div>
            <img src={workInProgress} alt="" />
          </div>
          <div>
            <img src={workInProgress} alt="" />
          </div>
          <div>
            <img src={workInProgress} alt="" />
          </div>


          {/* DUBLED PHOTOS */}
          <div>
            <img src={workInProgress} alt="" />
          </div>
          <div>
            <img src={workInProgress} alt="" />
          </div>
          <div>
            <img src={workInProgress} alt="" />
          </div>
          <div>
            <img src={workInProgress} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheyTrustedMe