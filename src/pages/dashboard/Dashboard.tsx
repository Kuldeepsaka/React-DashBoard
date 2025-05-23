import React, { useState } from 'react';
import { CardIcon, CardIcon1, CardIcon2, CardIcon3 } from '../../assets/svg';
import { Card, Image } from 'react-bootstrap';
import SelectBox from '../../components/common/commonSelectBox';
import Chart from '/assets/chart.png';
import team from '../../assets/team.png';
import teamFund from '../../assets/teamFund.png';
import circleSm from '../../assets/circle.png';
import circleLg from '../../assets/circle1.png';

const Dashboard: React.FC = () => {



  const cardData = [
    {
      icon: <CardIcon />,
      title: "Total Amount Invested",
      value: "$2,000",
    },
    {
      icon: <CardIcon1 />,
      title: "Active Plans",
      value: "35",
    },
    {
      icon: <CardIcon2 />,
      title: "Total Amount Claimed",
      value: "$1,850",
    },
    {
      icon: <CardIcon3 />,
      title: "Total Withdrawals Made",
      value: "200",
    },
  ];



  // Inside your component:
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' },
  ];

  return (
    <div className="dashboard-content">
      <div className="section-01 row">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`col-12 col-sm-6 col-md-6 col-lg-6 mb-3 col-xl-3 card-col card-${index + 1}`}
          >
            <Card>
              <div className="card-body p-0 d-flex gap-2 align-items-center justify-content-start">
                <div className="icon-sec ">
                  {item.icon}
                </div>
                <div className="card-content">
                  <p className='p-0 m-0'>{item.title}</p>
                  <h5>{item.value}</h5>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="row g-4">
        <div className="col-lg-8">
          <Card className='dash-card'>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <h4>Bonus</h4>
                <div>
                  <SelectBox
                    id="example-select"
                    // label="Select an option"
                    options={options}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    placeholder="Choose..."
                  />
                </div>
              </div>
              <div className='d-flex flex-wrap gap-2 mt-3'>
                <div className='card small_card col-auto'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
                <div className='card small_card col-auto'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
                <div className='card small_card col-auto'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
                <div className='card small_card col-auto'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
              </div>
              <div className='d-flex py-3 mt-4'>
                <Image src={Chart} className='graph' />
              </div>
            </Card.Body>
          </Card>

        </div>

        <div className="col-lg-4">
          <Card className='dash-card team-card'>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <h4>Team</h4>
              </div>
              <div className='d-flex gap-3 py-3 justify-content-start'>
                <div className='icon'>
                  <Image src={team} />
                </div>
                <div className='text'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
              </div>
              <div className='d-flex gap-3 py-3 border-top justify-content-start'>
                <div className='icon'>
                  <Image src={teamFund} />
                </div>
                <div className='text'>
                  <p>Total Bonus Earned</p>
                  <h5>$4,000</h5>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className='dash-card'>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <h4>Joinees</h4>
              </div>
              <div className='set-position position-relative'>
                <div className='animate position-absolute'>
                  <Image src={circleSm} />
                  <h5>60<br /><span>Indirect Joinee</span></h5>
                </div>
                <div className=' animate-01 position-absolute'>
                  <Image src={circleLg} />
                  <h5>35<br /><span>Direct Joinee</span></h5>
                </div>

              </div>

            </Card.Body>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;