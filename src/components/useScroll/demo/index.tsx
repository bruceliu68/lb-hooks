/**
 * title: 基本用法
 * desc: 尝试滚动一下文字内容。
 */

import React, { useRef } from 'react';
import useScroll from "../../useScroll";

function Demo2(): JSX.Element {
    const scroll = useScroll(document);
    return (
        <div>
            <div>{JSON.stringify(scroll)}</div>
        </div>
    );
}

export default () => {
    const ref = useRef<any>();
    const scroll = useScroll(ref);
    return (
        <>
            <div>{JSON.stringify(scroll)}</div>
            <div
                style={{
                    height: '160px',
                    width: '160px',
                    border: 'solid 1px #000',
                    overflow: 'scroll',
                    whiteSpace: 'nowrap',
                    fontSize: '32px',
                }}
                ref={ref}
            >
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque, debitis ex
                    excepturi explicabo iste iure labore molestiae neque optio perspiciatis
                </div>
                <div>
                    Aspernatur cupiditate, deleniti id incidunt mollitia omnis! A aspernatur assumenda
                    consequuntur culpa cumque dignissimos enim eos, et fugit natus nemo nesciunt
                 </div>
                <div>
                    Alias aut deserunt expedita, inventore maiores minima officia porro rem. Accusamus ducimus
                    magni modi mollitia nihil nisi provident
                </div>
                <div>
                    Alias aut autem consequuntur doloremque esse facilis id molestiae neque officia placeat,
                    quia quisquam repellendus reprehenderit.
                </div>
                <div>
                    Adipisci blanditiis facere nam perspiciatis sit soluta ullam! Architecto aut blanditiis,
                    consectetur corporis cum deserunt distinctio dolore eius est exercitationem
                </div>
                <div>Ab aliquid asperiores assumenda corporis cumque dolorum expedita</div>
                <div>
                    Culpa cumque eveniet natus totam! Adipisci, animi at commodi delectus distinctio dolore
                    earum, eum expedita facilis
                </div>
                <div>
                    Quod sit, temporibus! Amet animi fugit officiis perspiciatis, quis unde. Cumque
                    dignissimos distinctio, dolor eaque est fugit nisi non pariatur porro possimus, quas quasi
                </div>
            </div>
            <p>demo2</p>
            <Demo2 />
        </>
    );
};