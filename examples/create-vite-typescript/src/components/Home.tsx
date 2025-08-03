/*
 * Copyright 2025 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {useNavigate} from "react-router-dom";
import type {ReactNode} from "react";

const Home = (): ReactNode => {
  const navigate = useNavigate()

  return (
    <div>
      <button type='submit' onClick={() => navigate('/login')}>Go to Login</button>
      <button type='submit' onClick={() => navigate('/secure')}>GO to Secure Dashboard</button>
    </div>
  )
}

export default Home;
