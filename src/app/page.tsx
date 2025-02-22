"use client"
import Tile from "../demo/Tile";
import Auth from "../demo/auth/Auth";
import Admin from "../demo/Admin";
import Todo from "../demo/todo/Todo";

export default function Home() {
  return (
    <div className="tiles">
      <Tile
        title="fe422-remult2"
        subtitle=""
        icon="remult"
        className="intro"
        status="Success"
        width="half"
      >
        <div className="tile__title">What's next?</div>
        <div className="button-row">
          <a
            className="button"
            href="https://learn.remult.dev/"
            target="_blank"
          >
            Interactive Tutorial
          </a>
          <a className="button" href="https://remult.dev/docs" target="_blank">
            Documentation
          </a>
          <a
            className="button"
            href="https://github.com/remult/remult"
            target="_blank"
          >
            Github
          </a>
        </div>
        <div className="tile__subtitle"> Technology Stack Info:</div>
        <div className="intro__stack">
          <div className="intro__stack-item">
            <span>Framework</span>
            Next.js
          </div>
          <div className="intro__stack-item">
            <span>Database</span>
            Postgres
          </div>
          <div className="intro__stack-item">
            <span>Auth</span>
            auth.js
          </div>
        </div>
      </Tile>
      <Auth />
      <Admin />
      <Todo />
    </div>
  );
}
