"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import react, { useState, FormEvent } from 'react';


const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if (
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')) {
            return true;
        }

    }
    catch (err) {
        return false;
    }
    return false ;
}

const Searchbar = () => {

    const [searchPrompt, setsearchPrompt] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if(!isValidLink)
            return alert("Please Provide a Valid Amazon Link");
        try{
            setIsLoading(true);
            /// Scrape the product page 
            const product= await scrapeAndStoreProduct(searchPrompt);
        }catch(err){
            console.log(err);
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setsearchPrompt(e.target.value)
                }
                placeholder='Enter Product Link'
                className='searchbar-input'
            />
            <button 
            type="submit" 
            className='searchbar-btn'
            disabled={searchPrompt===''}
            >
                {isLoading?'Searching.....':'Search'}
            </button>
        </form>
    )
};

export default Searchbar;