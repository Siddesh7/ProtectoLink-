import { useParams } from "react-router-dom";
export default function SIP() {
  const { address } = useParams();
  return (
    <div className="bg-base-200">
      <div className="navbar bg-base-200 w-[95%] m-auto pt-[20px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div className="flex text-4xl">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                Glacier!
              </h1>
              <span className="ml-[4px]">🏔️</span>
            </div>
          </div>
          <div className="navbar-end"></div>
        </div>
      </div>
      <div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
