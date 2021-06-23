// @flow

// This is a test example for dev testing purpose.
import { Observable } from "rxjs";

const cmd = (): Observable<"dropBox"> =>
  Observable.create(o => {
    o.next("dropBox");
    o.error("Oups error dropBox")
    o.complete();
  });

export default cmd;