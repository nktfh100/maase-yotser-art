import Script from "next/script";


export default function NagishLi() {
    return (
        <>
            <Script id="nagishli-config">
                {`nagishli_config = {language: 'en', color: 'blue'}`}
            </Script>
            <Script src="/nagishli_beta.js?v=3.0b" charSet="utf-8" defer></Script>
        </>
    )
}